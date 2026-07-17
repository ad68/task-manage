import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, HttpStatus, Res } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import ProjectStatusEnum from './enum/projectStatusEnum';
import type { Response } from 'express';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('status') status: ProjectStatusEnum,
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1
  ) {
    const projects = await this.projectsService.findAll(status, limit, page);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: projects,
      message: "project found"
    })
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
