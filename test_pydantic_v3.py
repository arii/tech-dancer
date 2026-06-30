from typing import Dict, Any, Type, Literal
from pydantic import BaseModel
from pydantic.json_schema import GenerateJsonSchema, JsonSchemaValue
from pydantic_core import core_schema

class MCPGenerateJsonSchema(GenerateJsonSchema):
    def generate(self, schema: core_schema.CoreSchema, mode: Literal['validation', 'serialization'] = 'validation') -> JsonSchemaValue:
        res = super().generate(schema, mode)
        return self._fix_types(res)

    def _fix_types(self, obj: Any) -> Any:
        if isinstance(obj, dict):
            new_obj = {}
            for k, v in obj.items():
                if k == "type" and v == "integer":
                    new_obj[k] = "number"
                elif k == "title":
                    continue
                else:
                    new_obj[k] = self._fix_types(v)
            return new_obj
        elif isinstance(obj, list):
            return [self._fix_types(item) for item in obj]
        return obj

class TestModel(BaseModel):
    val: int

print(TestModel.model_json_schema(schema_generator=MCPGenerateJsonSchema))
