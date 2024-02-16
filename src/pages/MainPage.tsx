import React, { FC, useEffect, useState } from "react";
import { getStoreApiCall } from "../api/apiCalls";
import { useParams } from "react-router-dom";

type Props = {};

const MainPage: FC<Props> = () => {
  console.log("%c⧭ MainPage component is rendered.. ", "color: #00bf00");
  const { id } = useParams();
  console.log("%c⧭ URL param: id: ", "color: #00a3cc", id);

  const [stores, setStores] = useState();
  console.log("%c⧭ stores ", "color: #00e600", stores);

  useEffect(() => {
    // if (stores) {
    getStoreApiCall(parseInt(id || ""), setStores);
    // }
  }, []);

  return (
    <>
      <div>MainPage</div>;
      <div>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam lectus
        justo, vulputate eget mollis sed, tempor sed magna. Ut enim ad minima
        veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,
        nisi ut aliquid ex ea commodi consequatur? Maecenas libero. Nam libero
        tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
        minus id quod maxime placeat facere possimus, omnis voluptas assumenda
        est, omnis dolor repellendus. Nullam dapibus fermentum ipsum. Nullam
        faucibus mi quis velit. Aenean placerat. Etiam bibendum elit eget erat.
        Etiam neque. Quisque porta. Etiam bibendum elit eget erat. Fusce aliquam
        vestibulum ipsum. Etiam neque. Praesent dapibus. Nulla est. Mauris dolor
        felis, sagittis at, luctus sed, aliquam non, tellus. Sed ac dolor sit
        amet purus malesuada congue. Morbi scelerisque luctus velit. Curabitur
        ligula sapien, pulvinar a vestibulum quis, facilisis vel sapien. Donec
        ipsum massa, ullamcorper in, auctor et, scelerisque sed, est. Integer in
        sapien. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac
        pede. Mauris dictum facilisis augue. Nulla accumsan, elit sit amet
        varius semper, nulla mauris mollis quam, tempor suscipit diam nulla vel
        leo. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat. Itaque earum rerum hic tenetur
        a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
        consequatur aut perferendis doloribus asperiores repellat. In laoreet,
        magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet
        sapien wisi sed libero. Aenean id metus id velit ullamcorper pulvinar.
        Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Vestibulum
        erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Phasellus
        rhoncus. Mauris dolor felis, sagittis at, luctus sed, aliquam non,
        tellus. Aenean id metus id velit ullamcorper pulvinar. Etiam posuere
        lacus quis dolor. Aliquam erat volutpat. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos hymenaeos. Donec ipsum
        massa, ullamcorper in, auctor et, scelerisque sed, est. Phasellus
        rhoncus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
        ipsum massa, ullamcorper in, auctor et, scelerisque sed, est. Proin pede
        metus, vulputate nec, fermentum fringilla, vehicula vitae, justo.
        Maecenas sollicitudin. Aliquam erat volutpat. Neque porro quisquam est,
        qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
        quia non numquam eius modi tempora incidunt ut labore et dolore magnam
        aliquam quaerat voluptatem. Fusce dui leo, imperdiet in, aliquam sit
        amet, feugiat eu, orci. Pellentesque pretium lectus id turpis. Curabitur
        bibendum justo non orci. In rutrum. Suspendisse sagittis ultrices augue.
        Quisque tincidunt scelerisque libero. Praesent dapibus. Curabitur
        sagittis hendrerit ante. Quisque porta. Nullam dapibus fermentum ipsum.
        Mauris elementum mauris vitae tortor. Nullam feugiat, turpis at pulvinar
        vulputate, erat libero tristique tellus, nec bibendum odio risus sit
        amet ante. Suspendisse sagittis ultrices augue. Itaque earum rerum hic
        tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores
        alias consequatur aut perferendis doloribus asperiores repellat. Etiam
        neque. Sed vel lectus. Donec odio tempus molestie, porttitor ut, iaculis
        quis, sem. Nulla accumsan, elit sit amet varius semper, nulla mauris
        mollis quam, tempor suscipit diam nulla vel leo. Ut tempus purus at
        lorem. Duis bibendum, lectus ut viverra rhoncus, dolor nunc faucibus
        libero, eget facilisis enim ipsum id lacus. Duis sapien nunc, commodo
        et, interdum suscipit, sollicitudin et, dolor. Sed ut perspiciatis unde
        omnis iste natus error sit voluptatem accusantium doloremque laudantium,
        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
        architecto beatae vitae dicta sunt explicabo. Vivamus porttitor turpis
        ac leo. Nunc dapibus tortor vel mi dapibus sollicitudin.
      </div>
    </>
  );
};

export { MainPage };
