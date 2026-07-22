import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, HttpStatus, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import ProjectStatusEnum from './enum/projectStatusEnum';
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }


  @Post()
  async create(@Body() createProjectDto: CreateProjectDto, @Res() res: Response) {
    const createProject = await this.projectsService.create(createProjectDto);
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.OK,
      data: createProject,
      message: "project created"
    })
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
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const project = await this.projectsService.findOne(+id);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: project,
      message: "project found"
    })
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto, @Res() res: Response) {
    await this.projectsService.update(+id, updateProjectDto);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: null,
      message: "project updated"
    })
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.projectsService.remove(+id);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: null,
      message: "project deleted successful"
    })
  }
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'E:/uploads',
        filename: (req, file, callback) => {
          const uniqueName =
            Date.now() +
            '-' +
            Math.round(Math.random() * 1e9) +
            extname(file.originalname);
          callback(null, uniqueName);
        },
      }),
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    return {
      success: true,
      filename: file.filename,
      originalName: file.originalname,
      path: file.path,
      size: file.size,
    };
  }
}
