#!/usr/bin/env bash
# Uso: bash tools/montar-portal.sh calle.mp4 desna.mp4 manantial.mp4
# Los originales y sus identificadores se documentan en assets/portal/CREDITOS.txt.
set -eu
test "$#" -eq 3
raiz="$(cd "$(dirname "$0")/.." && pwd)"
salida="$raiz/assets/cine/umbral.mp4"
mkdir -p "$raiz/assets/portal"
temporal=$(mktemp -d)
trap 'rm -f "$temporal/video.mp4" "$temporal/cartel.webp"; rmdir "$temporal"' EXIT
# Cuatro entradas independientes evitan retener el plano inicial a 1080p en memoria.
# El corte cíclico se sitúa 24 fotogramas dentro del mismo plano de Járkiv.
ffmpeg -nostdin -hide_banner -loglevel error -y \
  -threads 2 -ss 0.6 -t 4.2 -i "$1" -threads 2 -ss 0.6 -t 4.2 -i "$2" \
  -threads 2 -ss 0.12 -t 4.2 -i "$3" -threads 2 -ss 0.6 -t 1.1 -i "$1" \
  -filter_complex_threads 2 -filter_complex "\
[0:v]fps=25,scale=1920:1080:flags=lanczos,setsar=1,settb=1/25,setpts=N,fps=25[a];\
[1:v]fps=25,scale=1920:1080:force_original_aspect_ratio=increase:flags=lanczos,crop=1920:1080,setsar=1,settb=1/25,setpts=N,fps=25[b];\
[2:v]fps=25,scale=1920:1080:flags=lanczos,setsar=1,settb=1/25,setpts=N,fps=25[c];\
[3:v]fps=25,scale=1920:1080:flags=lanczos,setsar=1,settb=1/25,setpts=N,fps=25[d];\
[a][b]xfade=duration=0.68:offset=3.52,fps=25[ab];\
[ab][c]xfade=duration=0.68:offset=7.04,fps=25[abc];\
[abc][d]xfade=duration=0.68:offset=10.56,fps=25,trim=start_frame=24:end_frame=288,settb=1/25,setpts=N,format=yuv420p[out]" \
  -map '[out]' -r 25 -fps_mode cfr -an -c:v libx264 -threads 3 -preset medium -crf 23 -movflags +faststart "$temporal/video.mp4"
ffmpeg -nostdin -hide_banner -loglevel error -y -threads 2 -i "$temporal/video.mp4" \
  -frames:v 1 -vf scale=1440:810 -c:v libwebp -quality 82 "$temporal/cartel.webp"
mv "$temporal/video.mp4" "$salida"
mv "$temporal/cartel.webp" "$raiz/assets/portal/portada.webp"
