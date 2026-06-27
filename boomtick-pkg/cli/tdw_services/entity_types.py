from typing import TypedDict, List, Optional, Any, Dict, Protocol, runtime_checkable, Iterable

@runtime_checkable
class GitHubFile(Protocol):
    filename: str
    status: str
    additions: int
    deletions: int
    patch: Optional[str]

@runtime_checkable
class GitHubUserProtocol(Protocol):
    login: str
    id: int

@runtime_checkable
class PullRequestProtocol(Protocol):
    number: int
    title: str
    body: Optional[str]
    user: GitHubUserProtocol
    head: Any
    base: Any
    draft: bool
    def get_files(self) -> Iterable[GitHubFile]: ...
    def get_reviews(self) -> Any: ...
    def get_review_comments(self) -> Iterable[Any]: ...
    def get_issue_comments(self) -> Iterable[Any]: ...
    def create_issue_comment(self, body: str) -> Any: ...

@runtime_checkable
class IssueProtocol(Protocol):
    number: int
    title: str
    body: Optional[str]
    user: GitHubUserProtocol
    def create_comment(self, body: str) -> Any: ...

class GitHubUser(TypedDict):
    login: str
    id: int
    url: str

class PullRequestDetails(TypedDict):
    number: int
    title: str
    body: Optional[str]
    state: str
    user: GitHubUser
    head: Dict[str, Any]
    base: Dict[str, Any]
    mergeable: Optional[bool]
    merged: bool

class IssueDetails(TypedDict):
    number: int
    title: str
    body: Optional[str]
    state: str
    user: GitHubUser
    labels: List[Dict[str, Any]]
    comments: int

class CheckRun(TypedDict):
    id: int
    name: str
    status: str
    conclusion: Optional[str]
    url: str
    external_id: Optional[str]
