
## 🔄 Workflow Architecture
GitHub Workflows for the toolkit are internalized in `boomtick-pkg/workflows/`.
The files in `.github/workflows/` serve as lightweight triggers that call these internalized versions.
This improves encapsulation and allows the toolkit to be extracted with its full CI/CD logic intact.
