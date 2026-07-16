import ProjectStatusEnum from "../enum/projectStatusEnum"

export class CreateProjectDto {
    name!: string
    status!: ProjectStatusEnum
    task!: string
}
