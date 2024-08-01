let pagina = 1;

const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

btnSiguiente.addEventListener("click", () => {
  if (pagina < 1000) {
    pagina += 1;
    cargarPeliculas();
  }
});

btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina -= 1;
    cargarPeliculas();
  }
});

const cargarPeliculas = async () => {
  try {
    const respuesta = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=709d7680cd4706a3d3dcd45b065ce4fd&language=es&page=${pagina}`
    );
    console.log(respuesta);

    if (respuesta.status === 200) {
      const datos = await respuesta.json();

      let peliculas = "";
      datos.results.forEach(pelicula => {
        peliculas += `
        <div class="pelicula">
        <h2 class="titulo">${pelicula.title}</h2>
        <img  class="poster "src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${pelicula.title}">
        <p class="descrip">${pelicula.overview}</p>
        </div>
                `
      });

      document.getElementById("contenedor").innerHTML = peliculas;
    } else if (respuesta.status === 401) {
      console.error("Error 401: Unauthorized");
    } else if (respuesta.status === 404) {
      console.error("Error 404: Not Found");
    } else {
      console.error(`Hubo un error desconocido: ${respuesta.status}`);
    }
  } catch (error) {
    console.error(`Hubo un error ${error}`);
  }
};

cargarPeliculas();
