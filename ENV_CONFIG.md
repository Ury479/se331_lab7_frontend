# 环境配置说明

## CORS 问题解决方案

### 当前配置
- **前端端口**: 5174 (Vite)
- **后端端口**: 8080 (Java/Spring Boot)
- **默认配置**: EventService 已配置为 `http://localhost:8080`

### 方案 1: 使用环境变量（推荐）

在项目根目录创建 `.env.development` 文件：

```env
# 开发环境后端 API 地址
VITE_BACKEND_URL=http://localhost:8080
```

### 方案 2: 使用 Vite 代理

已在 `vite.config.ts` 中配置代理，如需使用代理方式，修改 EventService.ts：

```typescript
const baseURL = '/api'; // 使用代理路径
```

### 方案 3: 后端配置 CORS

在 Spring Boot 后端添加 CORS 配置：

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5174")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

## 当前解决方案

已将 `EventService.ts` 的默认 baseURL 修改为 `http://localhost:8080`

**需要重启前端服务器才能生效！**

```bash
# 停止当前运行的前端服务器 (Ctrl + C)
# 然后重新启动
npm run dev
```

## 检查后端服务

确保后端服务正在运行并监听 8080 端口：

```bash
# 检查端口占用
lsof -i :8080
```

## 常见问题

### Q: 仍然出现 CORS 错误？
A: 请确保后端已正确配置 CORS，允许来自 `http://localhost:5174` 的请求。

### Q: 如何切换到不同的后端地址？
A: 创建 `.env.development` 文件并设置 `VITE_BACKEND_URL` 变量。

### Q: 生产环境如何配置？
A: 创建 `.env.production` 文件并设置生产环境的后端地址。

