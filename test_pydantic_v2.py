from pydantic import BaseModel, Field, ConfigDict
import json

class TestModel(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    prNumber: int = Field(..., alias="pr_number")

# Test validation
print(f"From camelCase: {TestModel(prNumber=1).prNumber}")
print(f"From snake_case: {TestModel(pr_number=2).prNumber}")

# Test JSON schema
print("JSON Schema (by_alias=True - default):")
print(json.dumps(TestModel.model_json_schema(by_alias=True), indent=2))
print("JSON Schema (by_alias=False):")
print(json.dumps(TestModel.model_json_schema(by_alias=False), indent=2))
