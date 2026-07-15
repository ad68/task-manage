import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Ad68@2309412",
    database: "task_management",
    autoLoadEntities: true,
    synchronize: true,
  }), ProjectsModule, TasksModule],
})
export class AppModule { }
