# Arch linux run

docker run -it --rm --ipc=host mcr.microsoft.com/playwright:v1.53.0-noble /bin/bash

docker run --rm -it \
  --ipc=host \
  -v $(pwd):/work \
  -w /work \
  mcr.microsoft.com/playwright:v1.53.0-noble \
  npx playwright test
#   a u t o m a t i o n _ e x e r c i s e  
 