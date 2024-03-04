from schemas import FeedbackUserSchema
from sqlalchemy.ext.asyncio import AsyncSession


async def update_feedback_db(
    session: AsyncSession,
    feedback: FeedbackUserSchema,
    feedback_update: FeedbackUserSchema,
    partial: bool = False,
) -> FeedbackUserSchema:
    for name, value in feedback_update.model_dump(exclude_unset=partial).items():
        setattr(feedback, name, value)
    await session.commit()
    return feedback


async def delete_feedback_db(
    session: AsyncSession, feedback: FeedbackUserSchema
) -> None:
    await session.delete(feedback)
    await session.commit()
