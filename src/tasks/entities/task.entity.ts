import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import TaskStatusEnum from "../enum/taskStatusEnum";
import { Project } from "src/projects/entities/project.entity";
@Entity({ name: "tasks" })
export class Task {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    title!: string
    @Column()
    description!: string
    @Column({ type: "enum", enum: TaskStatusEnum, default: TaskStatusEnum.Set })
    status!: TaskStatusEnum
    @ManyToOne(() => Project, (project) => project.tasks)
    @JoinColumn({ name: "project_id" })
    project!: Project
}
