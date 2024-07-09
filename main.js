import './style.css'

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camear);
}

animate()