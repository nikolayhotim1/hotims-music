import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const start = async () => {
    try {
        const PORT = process.env.PORT || 5000;
        const app = await NestFactory.create(AppModule);
        const config = new DocumentBuilder()
            .setTitle('Hotims Music')
            .setDescription('REST-API docs')
            .setVersion('1.0.0')
            .addTag('N1kolay')
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('/api/docs', app, document);
        app.enableCors();
        await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();