from fastapi import APIRouter

from api.api_v1.endpoints.user import router as user_router
from .api_v1.endpoints.profile import router as profile_router
from .api_v1.endpoints.rating_user import router as rating_router
from .api_v1.endpoints.category import router as category_router
from .api_v1.endpoints.property import router as property_router
from .api_v1.endpoints.posts_user import router as post_router
from .api_v1.endpoints.token import router as token_router
from .api_v1.endpoints.blog import router as blog_router
from .api_v1.endpoints.comment import router as comment_router
from .api_v1.endpoints.main_site import router as main_site_router

router = APIRouter()
router_token = APIRouter()
router.include_router(router=user_router, prefix="/users")
router.include_router(router=profile_router, prefix="/profiles")
router.include_router(router=rating_router, prefix="/ratings")
router.include_router(router=category_router, prefix="/categories")
router.include_router(router=property_router, prefix="/properties")
router.include_router(router=post_router, prefix="/posts")
router.include_router(router=blog_router, prefix="/blog")
router.include_router(router=comment_router, prefix="/comment")
router.include_router(router=main_site_router, prefix="/main_site")
router_token.include_router(router=token_router)

