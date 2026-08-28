# Stage 1: Dependency builder
FROM python:3.11-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN grep -v -E 'pytest' requirements.txt > req_prod.txt \
    && pip install --no-cache-dir --user -r req_prod.txt \
    && find /root/.local -type d -name "__pycache__" -exec rm -rf {} + \
    && find /root/.local -type f -name "*.pyc" -delete

# Stage 2: Minimal runtime
FROM python:3.11-slim AS runner
WORKDIR /app

RUN useradd -m appuser
COPY --from=builder /root/.local /home/appuser/.local
COPY . /app/wcs_navigator_api/
RUN chown -R appuser:appuser /app /home/appuser/.local

USER appuser
ENV PATH=/home/appuser/.local/bin:$PATH
ENV PYTHONPATH=/app
ENV PORT=8080
EXPOSE 8080
CMD ["uvicorn", "wcs_navigator_api.main:app", "--host", "0.0.0.0", "--port", "8080"]
