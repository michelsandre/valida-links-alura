import chalk from "chalk";

export default async function listaValidada(listaDeLinks) {
  const links = extraiLinks(listaDeLinks);
  const status = await checaStatus(links);

  return listaDeLinks.map((obj, i) => ({
    ...obj,
    status: status[i],
  }));
}

function extraiLinks(arrLinks) {
  return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}

async function checaStatus(listaURLs) {
  const arrStatus = await Promise.all(
    listaURLs.map(async (url) => {
      try {
        const response = await fetch(url, { method: "HEAD" });
        return response.status;
      } catch (err) {
        return manejaErros(err);
      }
    })
  );
  return arrStatus;
}

function manejaErros(err) {
  if (err.cause.code === "ENOTFOUND") {
    return "link não encontrado";
  } else {
    return "ocorreu algum erro";
  }
}
