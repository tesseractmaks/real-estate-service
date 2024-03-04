from __future__ import annotations

from math import ceil
from typing import (
    Any,
    Awaitable,
    Callable,
    Dict,
    Generic,
    Optional,
    Sequence,
    TypeVar,
    Union,
)

from fastapi import Query
from fastapi_pagination.bases import AbstractPage, AbstractParams
from fastapi_pagination.default import Page as BasePage
from fastapi_pagination.default import Params as BaseParams
from fastapi_pagination.utils import create_pydantic_model
from pydantic import ConfigDict, conint
from typing_extensions import TYPE_CHECKING, Literal, TypeAlias

Cursor: TypeAlias = Union[str, bytes]
ParamsType: TypeAlias = Literal["cursor", "limit-offset"]
AdditionalData: TypeAlias = Optional[Dict[str, Any]]

AsyncItemsTransformer: TypeAlias = Callable[
    [Sequence[Any]], Union[Sequence[Any], Awaitable[Sequence[Any]]]
]
SyncItemsTransformer: TypeAlias = Callable[[Sequence[Any]], Sequence[Any]]
ItemsTransformer: TypeAlias = Union[AsyncItemsTransformer, SyncItemsTransformer]

if TYPE_CHECKING:
    GreaterEqualZero: TypeAlias = int
    GreaterEqualOne: TypeAlias = int
else:
    GreaterEqualZero: TypeAlias = conint(ge=0)
    GreaterEqualOne: TypeAlias = conint(ge=1)

T = TypeVar("T")


class Params(BaseParams):
    page: int = Query(1, ge=1, description="Page number")
    size: int = Query(9, ge=1, le=50, description="Page size")


class Page(BasePage[T], AbstractPage[T], Generic[T]):
    model_config = ConfigDict(arbitrary_types_allowed=True, from_attributes=True)

    page: Optional[GreaterEqualOne]
    size: Optional[GreaterEqualOne]
    pages: Optional[GreaterEqualZero] = None

    __params_type__ = Params

    @classmethod
    def create(
        cls,
        items: Sequence[T],
        params: AbstractParams,
        *,
        total: Optional[int] = None,
        **kwargs: Any,
    ) -> Page[T]:
        if not isinstance(params, Params):
            raise TypeError("Page should be used with Params")

        size = params.size if params.size is not None else total
        page = params.page if params.page is not None else 1
        pages = ceil(total / size) if total is not None else None

        return create_pydantic_model(
            cls,
            total=total,
            items=items,
            page=page,
            size=size,
            pages=pages,
            **kwargs,
        )
