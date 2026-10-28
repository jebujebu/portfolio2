import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const galleryFolders = ['valaistus', 'mallinnus']
const imageExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.webp'])
const galleryModuleId = 'virtual:gallery-images'
const resolvedGalleryModuleId = `\0${galleryModuleId}`

function galleryImagesPlugin() {
  const projectRoot = path.dirname(fileURLToPath(import.meta.url))
  const galleryPaths = galleryFolders.map((folder) => path.join(projectRoot, 'public', 'pics', folder))

  function readGalleryImages() {
    return Object.fromEntries(
      galleryFolders.map((folder, index) => {
        const files = readdirSync(galleryPaths[index], { withFileTypes: true })
          .filter(
            (entry) =>
              entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase()),
          )
          .map((entry) => entry.name)
          .sort((first, second) => first.localeCompare(second, 'fi'))

        return [folder, files]
      }),
    )
  }

  return {
    name: 'gallery-images',
    resolveId(id) {
      return id === galleryModuleId ? resolvedGalleryModuleId : null
    },
    load(id) {
      if (id !== resolvedGalleryModuleId) return null
      return `export const galleryImages = ${JSON.stringify(readGalleryImages())}`
    },
    configureServer(server) {
      server.watcher.add(galleryPaths)

      const reloadGallery = (filePath) => {
        if (!imageExtensions.has(path.extname(filePath).toLowerCase())) return
        const module = server.moduleGraph.getModuleById(resolvedGalleryModuleId)
        if (module) server.moduleGraph.invalidateModule(module)
        server.ws.send({ type: 'full-reload' })
      }

      server.watcher.on('add', reloadGallery)
      server.watcher.on('unlink', reloadGallery)
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), galleryImagesPlugin()],
})
