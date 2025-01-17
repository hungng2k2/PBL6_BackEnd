import httpStatus from "http-status";
import { Review, User, ExpertInfo, JobRequest } from "../models/index.js";
import ApiError from "../utils/ApiError.js";

const createReview = async ({ user_id, job_request_id, rating, comment }) => {
  const job_request = await job_request.findById(job_request_id).lean();
  if (!job_request) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Job not found");
  }
  if (job_request.user.toString() !== user_id.toString()) {
    throw new ApiError(httpStatus.BAD_REQUEST, "You are not the owner");
  }
  // TODO: check booking status

  if (await Review.exists({ user: user_id, job_request: job_request_id })) {
    throw new ApiError(httpStatus.BAD_REQUEST, "You already reviewed this job");
  }

  // update expert's rating
  const expert = await ExpertInfo.findById(booking.expert);
  if (!expert) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Expert not found");
  }
  await expert.updateOne({
    rating_count: expert.rating_count + 1,
    average_rating:
      (expert.average_rating * expert.rating_count + rating) /
      (expert.rating_count + 1),
  });

  const review = await Review.create({
    user: user_id,
    expert: expert._id,
    job_request: job_request_id,
    rating: rating,
    comment: comment,
  });
  return review;
};

const fetchReviewsPaginationByExpertId = async (
  expert_id,
  page = 1,
  limit = 10
) => {
  const pagination = await Review.paginate(
    { expert: expert_id },
    {
      populate: [
        {
          path: "user",
          select: "first_name last_name photo_url",
        },
      ],
      page,
      limit,
      lean: true,
      customLabels: {
        docs: "reviews",
      },
    }
  );
  return pagination;
};

export default {
  createReview,
  fetchReviewsPaginationByExpertId,
};
