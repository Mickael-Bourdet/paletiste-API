import fs from "fs";
import path from "path";

const folder = path.join(process.cwd(), "uploads", "events");

fs.readdir(folder, (err, files) => {
  if (err) {
    console.error("Erreur de lecture du dossier:", err);
    return;
  }

  for (const file of files) {
    fs.unlink(path.join(folder, file), (err) => {
      if (err) {
        console.error(`Erreur suppression fichier ${file}:`, err);
      } else {
        console.log(`✅ Supprimé : ${file}`);
      }
    });
  }
});
