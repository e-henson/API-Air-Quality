//renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
})

//set pixel ratio
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor(0xffffff, 0)

const sectionTag = document.querySelector("section")
sectionTag.appendChild(renderer.domElement)

//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000)
camera.position.z = -1000

//make loader for texture
const loader = new THREE.TextureLoader()

//hold camera positions
let currentX = 0
let currentY = 0
let aimX = 0
let aimY = 0

//animate function
const animate = function () {
    const diffX = aimX - currentX
    const diffY = aimY - currentY
    currentX = currentX + diffX * 0.05
    currentY = currentY + diffY * 0.05
    camera.position.x = currentX
    camera.position.y = currentY    
    camera.lookAt(scene.position)
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate()

//window resize
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})

//mousemove
document.addEventListener('mousemove', function(event) {
    aimX = ((window.innerWidth / 2) - event.pageX) * 4
    aimY = ((window.innerHeight / 2) - event.pageY) * 4
})

//touchmove - for tablets/mobile
document.addEventListener('touchmove', function(event) {
    aimX = ((window.innerWidth / 2) - event.pageX) * 4
    aimY = ((window.innerHeight / 2) - event.pageY) * 4
})

//particle field
const makeParticles = function(url) {
    const texture = loader.load(url)
    const geometry = new THREE.Geometry()
    for (let i = 0; i < 5000; i = i + 1) {
        const point = new THREE.Vector3();

        function randn(){
            var u=0,v=0;
            while(u===0)u=Math.random();
            while(v===0)v=Math.random();
            return Math.sqrt(-2.0*Math.log(u))*Math.cos(2.0*Math.PI*v);
          }

            function getPoint() {
                var u = Math.random();
                var x1 = randn();
                var x2 = randn();
                var x3 = randn();
            
                var mag = Math.sqrt(x1*x1 + x2*x2 + x3*x3);
                x1 /= mag; x2 /= mag; x3 /= mag;
            
                var c = Math.cbrt(u);
            
                return {x: 6000*x1*c, y: 6000*x2*c, z: 6000*x3*c}
                }     

                const randPoint = getPoint()
                point.set(randPoint.x, randPoint.y, randPoint.z)
                geometry.vertices.push(point)
            }
        
            const material = new THREE.PointsMaterial({
                size: 50,
                map: texture,
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthTest: true,
                depthWrite: false
            })

        const points = new THREE.Points(geometry, material)

        scene.add(points)
        return points
}

const particle3 = makeParticles("particle1.png");
const particle4 = makeParticles("particle2.png");
