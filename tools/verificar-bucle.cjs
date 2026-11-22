// node tools/verificar-bucle.cjs archivo.mp4 resultado.json
const fs=require('node:fs'),cp=require('node:child_process'),assert=require('node:assert/strict');
const [archivo,informe]=process.argv.slice(2),bytesPorFotograma=160*90*3;
const video=cp.execFileSync('ffmpeg',['-v','error','-i',archivo,'-vf','scale=160:90','-pix_fmt','rgb24','-f','rawvideo','-'],{maxBuffer:32*1024*1024});
const total=video.length/bytesPorFotograma,cambios=[];let luminancia=255;
for(let i=0;i<total;i++){
 const actual=i*bytesPorFotograma,anterior=((i+total-1)%total)*bytesPorFotograma;let dif=0,luz=0;
 for(let j=0;j<bytesPorFotograma;j++){dif+=Math.abs(video[actual+j]-video[anterior+j]);luz+=video[actual+j]}
 cambios.push(dif/bytesPorFotograma);luminancia=Math.min(luminancia,luz/bytesPorFotograma);
}
const tres=n=>Number(n.toFixed(3)),orden=[...cambios].sort((a,b)=>a-b),mediana=(orden[95]+orden[96])/2;
const informeBucle={fotogramas:total,fps:24,diferenciaAbsolutaMediaRGB:{ultimoAlPrimero:tres(cambios[0]),primeroAlSegundo:tres(cambios[1]),penultimoAlUltimo:tres(cambios.at(-1)),mediana:tres(mediana)},fotogramasConsecutivosIdenticos:cambios.filter(d=>d===0).length,menorLuminanciaMediaDeUnFotograma:Number(luminancia.toFixed(2))};
assert.equal(total,192);assert.equal(informeBucle.fotogramasConsecutivosIdenticos,0);assert.ok(cambios[0]<Math.max(2,mediana*3));assert.ok(luminancia>15);
fs.writeFileSync(informe,JSON.stringify(informeBucle,null,2)+'\n');
