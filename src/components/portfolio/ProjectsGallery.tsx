// ...existing code...
 const ProjectsGallery: FC<ProjectsGalleryProps> = ({
   projects,
   onProjectOpen,
   showFilter = true,
   maxProjects,
   className = '',
-  isPaused = false,
+  isPaused: _isPaused = false,
 }) => {
// ...existing code...
