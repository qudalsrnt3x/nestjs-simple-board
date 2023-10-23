import { PartialType, PickType } from "@nestjs/mapped-types";
import { CreatePostDto } from "./create-post.dto";

// export class UpdatePostDto extends PartialType(CreatePostDto) {}
export class UpdatePostDto extends PickType(CreatePostDto, ['content']) {}