from typing import Dict, Any, Type, Literal
from pydantic import BaseModel
from pydantic.json_schema import GenerateJsonSchema, JsonSchemaValue
from pydantic_core import core_schema

class MCPGenerateJsonSchema(GenerateJsonSchema):
    def integer_schema(self, schema: core_schema.IntSchema) -> JsonSchemaValue:
        json_schema = super().integer_schema(schema)
        json_schema['type'] = 'number'
        return json_schema

    def field_title_should_be_set(self, schema: core_schema.CoreSchema) -> bool:
        return False

class TestModel(BaseModel):
    val: int

print(TestModel.model_json_schema(schema_generator=MCPGenerateJsonSchema))
