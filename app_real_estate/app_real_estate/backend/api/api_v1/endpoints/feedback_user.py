# from fastapi import APIRouter, status, Depends
# from sqlalchemy.ext.asyncio import AsyncSession
#
# from crud import (
#     read_feedbacks_db,
#     create_feedback_db,
#     update_feedback_db,
#     delete_feedback_db
# )
# from db import db_helper
# from schemas import (
#     FeedbackUserSchema,
# )
# from .depends_endps import feedback_by_id
#
# router = APIRouter(tags=["Feedbacks"])
#
#
# @router.get(
#     "/",
#     response_model=list[FeedbackUserSchema]
# )
# async def read_feedback(
#         session: AsyncSession = Depends(db_helper.scoped_session_dependency)
# ):
#     return await read_feedbacks_db(session=session)
#
#
# @router.get(
#     "/{feedback_id}/",
#     response_model=FeedbackUserSchema
# )
# async def read_feedback_by_id(
#         feedback: FeedbackUserSchema = Depends(feedback_by_id)
# ):
#     return feedback
#
#
# @router.post(
#     "/",
#     response_model=FeedbackUserSchema,
#     status_code=status.HTTP_201_CREATED
# )
# async def create_feedback(
#         feedback_in: FeedbackUserSchema,
#         session: AsyncSession = Depends(db_helper.scoped_session_dependency)
# ):
#     return await create_feedback_db(session=session, feedback_in=feedback_in)
#
#
# @router.put(
#     "/{feedback_id}",
#     response_model=FeedbackUserSchema
# )
# async def update_feedback(
#         feedback_update: FeedbackUserSchema,
#         feedback: FeedbackUserSchema = Depends(feedback_by_id),
#         session: AsyncSession = Depends(db_helper.scoped_session_dependency)
# ):
#     return await update_feedback_db(
#         session=session,
#         feedback=feedback,
#         feedback_update=feedback_update
#     )
#
#
# @router.patch(
#     "/{feedback_id}",
#     response_model=FeedbackUserSchema
# )
# async def update_feedback_partial(
#         feedback_update: FeedbackUserSchema,
#         feedback: FeedbackUserSchema = Depends(feedback_by_id),
#         session: AsyncSession = Depends(db_helper.scoped_session_dependency)
# ):
#     return await update_feedback_db(
#         session=session,
#         feedback=feedback,
#         feedback_update=feedback_update,
#         partial=True
#     )
#
#
# @router.delete("/{feedback_id}/", status_code=status.HTTP_204_NO_CONTENT)
# async def delete_feedback(
#         feedback: FeedbackUserSchema = Depends(feedback_by_id),
#         session: AsyncSession = Depends(db_helper.scoped_session_dependency)
# ) -> None:
#     await delete_feedback_db(feedback=feedback, session=session)
