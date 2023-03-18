import React from "react";
import "./sss.scss";
import { useState } from "react";

const Headers = [
  "Sıkça Sorulan Sorular",
  "Kullanım Koşulları",
  "Gizlilik Politikası",
  "Çerez Politikası",
  "Kişisel Verilerin Korunması"
];
export default function Sss(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <div id="Sss" className="page">
      <div className="kapsayici">
        <div className="navSide">
          {Headers.map((header, index) => {
            return (
              <div onClick={() => setCurrentIndex(index)} className="oneNav" style={{background:currentIndex===index? "rgba(var(--theme-color-rgb), .1)" : "white"}}>
                <a >
                  <span style={{color:currentIndex===index? "var(--theme-color)":"black"}}>{header}</span>
                </a>
              </div>
            );
          })}
        </div>
        {currentIndex == 4 && (
          <div className="textSide">
            <div className="text">
              <strong>Kişisel Verilerin Korunması</strong>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab,
                aliquam! Voluptatibus impedit incidunt magni cupiditate
                asperiores. Ut itaque voluptatum dolor eaque, vitae et inventore
                voluptates. Dicta error consectetur ut, eaque, voluptatem
                laborum praesentium itaque cum in voluptates voluptas ullam?
                Praesentium, maxime! Quisquam illum, temporibus vitae iusto
                numquam maxime, accusantium, obcaecati perspiciatis neque aut
                expedita soluta! Sed soluta et neque maiores iste enim quisquam
                praesentium earum sequi molestiae reiciendis blanditiis, ipsum,
                consequatur exercitationem totam eligendi, autem ea similique
                magni. Assumenda, error sapiente! Odio tenetur consectetur illum
                ex quia dolorem soluta officiis deserunt voluptatem minima sunt
                recusandae voluptates enim, ullam, nesciunt possimus.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus nisi cupiditate quo quod quae voluptates ex? Odio
                ipsa voluptate dicta necessitatibus laudantium at quae dolore
                dolorem facilis porro, tempore corrupti eum, modi eos velit
                cupiditate? Quaerat, quod hic modi architecto eaque quae
                pariatur saepe ducimus in illum aspernatur? Eaque, possimus!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                harum recusandae mollitia dicta necessitatibus perspiciatis quam
                neque debitis sit voluptate eaque illo, iste est consequuntur.
                Labore dolore eligendi ipsa culpa blanditiis, veniam accusantium
                dignissimos? Omnis voluptate nihil magni illo consectetur,
                obcaecati in veniam dignissimos nam fugit, rerum fugiat velit
                neque modi ab eligendi? Deserunt, accusantium molestias. Odit
                beatae repellat a autem minus fugit! Molestiae ipsum saepe
                voluptatibus consequuntur veniam necessitatibus consectetur
                assumenda ipsam tenetur eius autem modi fugit vitae cupiditate
                itaque laudantium eum asperiores qui, quod suscipit! Dolores,
                fugit quasi doloribus eaque numquam aspernatur? Iste veritatis
                beatae tempora dolore molestiae.
              </p>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque ipsum magni doloremque quis, dolorem ullam voluptatibus dolore quisquam praesentium cupiditate harum eligendi, aspernatur quasi qui nostrum labore. Minima esse molestiae illum quisquam est dolorum incidunt eius eum ex sit pariatur necessitatibus laudantium amet, laboriosam laborum debitis blanditiis facilis? At, nostrum.</p>
            </div>
          </div>
        )}
        {currentIndex == 3 && (
          <div className="textSide">
            <div className="text">
              <strong>Çerez Politikası</strong>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab,
                aliquam! Voluptatibus impedit incidunt magni cupiditate
                asperiores. Ut itaque voluptatum dolor eaque, vitae et inventore
                voluptates. Dicta error consectetur ut, eaque, voluptatem
                laborum praesentium itaque cum in voluptates voluptas ullam?
                Praesentium, maxime! Quisquam illum, temporibus vitae iusto
                numquam maxime, accusantium, obcaecati perspiciatis neque aut
                expedita soluta! Sed soluta et neque maiores iste enim quisquam
                praesentium earum sequi molestiae reiciendis blanditiis, ipsum,
                consequatur exercitationem totam eligendi, autem ea similique
                magni. Assumenda, error sapiente! Odio tenetur consectetur illum
                ex quia dolorem soluta officiis deserunt voluptatem minima sunt
                recusandae voluptates enim, ullam, nesciunt possimus.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus nisi cupiditate quo quod quae voluptates ex? Odio
                ipsa voluptate dicta necessitatibus laudantium at quae dolore
                dolorem facilis porro, tempore corrupti eum, modi eos velit
                cupiditate? Quaerat, quod hic modi architecto eaque quae
                pariatur saepe ducimus in illum aspernatur? Eaque, possimus!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                harum recusandae mollitia dicta necessitatibus perspiciatis quam
                neque debitis sit voluptate eaque illo, iste est consequuntur.
                Labore dolore eligendi ipsa culpa blanditiis, veniam accusantium
                dignissimos? Omnis voluptate nihil magni illo consectetur,
                obcaecati in veniam dignissimos nam fugit, rerum fugiat velit
                neque modi ab eligendi? Deserunt, accusantium molestias. Odit
                beatae repellat a autem minus fugit! Molestiae ipsum saepe
                voluptatibus consequuntur veniam necessitatibus consectetur
                assumenda ipsam tenetur eius autem modi fugit vitae cupiditate
                itaque laudantium eum asperiores qui, quod suscipit! Dolores,
                fugit quasi doloribus eaque numquam aspernatur? Iste veritatis
                beatae tempora dolore molestiae.
              </p>
            </div>
          </div>
        )}
        {currentIndex == 2 && (
          <div className="textSide">
            <div className="text">
              <strong>Gizlilik Politikası</strong>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab,
                aliquam! Voluptatibus impedit incidunt magni cupiditate
                asperiores. Ut itaque voluptatum dolor eaque, vitae et inventore
                voluptates. Dicta error consectetur ut, eaque, voluptatem
                laborum praesentium itaque cum in voluptates voluptas ullam?
                Praesentium, maxime! Quisquam illum, temporibus vitae iusto
                numquam maxime, accusantium, obcaecati perspiciatis neque aut
                expedita soluta! Sed soluta et neque maiores iste enim quisquam
                praesentium earum sequi molestiae reiciendis blanditiis, ipsum,
                consequatur exercitationem totam eligendi, autem ea similique
                magni. Assumenda, error sapiente! Odio tenetur consectetur illum
                ex quia dolorem soluta officiis deserunt voluptatem minima sunt
                recusandae voluptates enim, ullam, nesciunt possimus.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus nisi cupiditate quo quod quae voluptates ex? Odio
                ipsa voluptate dicta necessitatibus laudantium at quae dolore
                dolorem facilis porro, tempore corrupti eum, modi eos velit
                cupiditate? Quaerat, quod hic modi architecto eaque quae
                pariatur saepe ducimus in illum aspernatur? Eaque, possimus!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                harum recusandae mollitia dicta necessitatibus perspiciatis quam
                neque debitis sit voluptate eaque illo, iste est consequuntur.
                Labore dolore eligendi ipsa culpa blanditiis, veniam accusantium
                dignissimos? Omnis voluptate nihil magni illo consectetur,
                obcaecati in veniam dignissimos nam fugit, rerum fugiat velit
                neque modi ab eligendi? Deserunt, accusantium molestias. Odit
                beatae repellat a autem minus fugit! Molestiae ipsum saepe
                voluptatibus consequuntur veniam necessitatibus consectetur
                assumenda ipsam tenetur eius autem modi fugit vitae cupiditate
                itaque laudantium eum asperiores qui, quod suscipit! Dolores,
                fugit quasi doloribus eaque numquam aspernatur? Iste veritatis
                beatae tempora dolore molestiae.
              </p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aperiam, obcaecati aliquam quae neque illo, qui tenetur distinctio sint minima non natus sapiente veritatis!</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est repellat dolor porro quod accusantium iure, natus optio ducimus officia! Nulla, non ducimus sunt itaque officiis, veniam perspiciatis enim minus provident exercitationem atque. Nam rem dolorem accusantium laboriosam corporis? Labore perferendis dolor exercitationem laudantium eos similique ex soluta sed expedita deserunt. Nostrum voluptate rerum, iste eos est rem ut cumque fuga quis sequi nulla, nemo voluptatem explicabo, id totam tempore quibusdam pariatur in facere accusamus quisquam. Facilis quod nobis animi dignissimos.</p>
            </div>
          </div>
        )}
        {currentIndex == 1 && (
          <div className="textSide">
            <div className="text">
              <strong>Kullanım Koşulları</strong>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab,
                aliquam! Voluptatibus impedit incidunt magni cupiditate
                asperiores. Ut itaque voluptatum dolor eaque, vitae et inventore
                voluptates. Dicta error consectetur ut, eaque, voluptatem
                laborum praesentium itaque cum in voluptates voluptas ullam?
                Praesentium, maxime! Quisquam illum, temporibus vitae iusto
                numquam maxime, accusantium, obcaecati perspiciatis neque aut
                expedita soluta! Sed soluta et neque maiores iste enim quisquam
                praesentium earum sequi molestiae reiciendis blanditiis, ipsum,
                consequatur exercitationem totam eligendi, autem ea similique
                magni. Assumenda, error sapiente! Odio tenetur consectetur illum
                ex quia dolorem soluta officiis deserunt voluptatem minima sunt
                recusandae voluptates enim, ullam, nesciunt possimus.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus nisi cupiditate quo quod quae voluptates ex? Odio
                ipsa voluptate dicta necessitatibus laudantium at quae dolore
                dolorem facilis porro, tempore corrupti eum, modi eos velit
                cupiditate? Quaerat, quod hic modi architecto eaque quae
                pariatur saepe ducimus in illum aspernatur? Eaque, possimus!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                harum recusandae mollitia dicta necessitatibus perspiciatis quam
                neque debitis sit voluptate eaque illo, iste est consequuntur.
                Labore dolore eligendi ipsa culpa blanditiis, veniam accusantium
                dignissimos? Omnis voluptate nihil magni illo consectetur,
                obcaecati in veniam dignissimos nam fugit, rerum fugiat velit
                neque modi ab eligendi? Deserunt, accusantium molestias. Odit
                beatae repellat a autem minus fugit! Molestiae ipsum saepe
                voluptatibus consequuntur veniam necessitatibus consectetur
                assumenda ipsam tenetur eius autem modi fugit vitae cupiditate
                itaque laudantium eum asperiores qui, quod suscipit! Dolores,
                fugit quasi doloribus eaque numquam aspernatur? Iste veritatis
                beatae tempora dolore molestiae.
              </p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, consequatur. Ullam consequatur laudantium, nemo vel quo laborum quis quia minima et temporibus fugiat magni dolor ratione omnis totam. Laborum, quibusdam!</p>
            </div>
          </div>
        )}
        {currentIndex == 0 && (
          <div className="textSide">
            <div className="text">
              <strong>Sıkça Sorulan Sorular</strong>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab,
                aliquam! Voluptatibus impedit incidunt magni cupiditate
                asperiores. Ut itaque voluptatum dolor eaque, vitae et inventore
                voluptates. Dicta error consectetur ut, eaque, voluptatem
                laborum praesentium itaque cum in voluptates voluptas ullam?
                Praesentium, maxime! Quisquam illum, temporibus vitae iusto
                numquam maxime, accusantium, obcaecati perspiciatis neque aut
                expedita soluta! Sed soluta et neque maiores iste enim quisquam
                praesentium earum sequi molestiae reiciendis blanditiis, ipsum,
                consequatur exercitationem totam eligendi, autem ea similique
                magni. Assumenda, error sapiente! Odio tenetur consectetur illum
                ex quia dolorem soluta officiis deserunt voluptatem minima sunt
                recusandae voluptates enim, ullam, nesciunt possimus.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus nisi cupiditate quo quod quae voluptates ex? Odio
                ipsa voluptate dicta necessitatibus laudantium at quae dolore
                dolorem facilis porro, tempore corrupti eum, modi eos velit
                cupiditate? Quaerat, quod hic modi architecto eaque quae
                pariatur saepe ducimus in illum aspernatur? Eaque, possimus!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                harum recusandae mollitia dicta necessitatibus perspiciatis quam
                neque debitis sit voluptate eaque illo, iste est consequuntur.
                Labore dolore eligendi ipsa culpa blanditiis, veniam accusantium
                dignissimos? Omnis voluptate nihil magni illo consectetur,
                obcaecati in veniam dignissimos nam fugit, rerum fugiat velit
                neque modi ab eligendi? Deserunt, accusantium molestias. Odit
                beatae repellat a autem minus fugit! Molestiae ipsum saepe
                voluptatibus consequuntur veniam necessitatibus consectetur
                assumenda ipsam tenetur eius autem modi fugit vitae cupiditate
                itaque laudantium eum asperiores qui, quod suscipit! Dolores,
                fugit quasi doloribus eaque numquam aspernatur? Iste veritatis
                beatae tempora dolore molestiae.
              </p>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem earum perferendis eligendi natus enim laborum quaerat, vel ad quae sequi officiis? Ratione delectus quo adipisci, molestias harum cumque velit veniam rem dignissimos! At commodi ea minima? Laboriosam, quis deserunt quaerat quasi adipisci ab cumque labore maxime minus, illum esse commodi nostrum earum hic animi dicta quas nesciunt nihil ea error illo explicabo. Ea cumque natus, amet ipsum impedit laudantium obcaecati.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
