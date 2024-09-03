import React from "react";

interface AboutPanelProps {
  isVisible: boolean; // Controls visibility
}

const AboutPanel: React.FC<AboutPanelProps> = ({ isVisible }) => {
  return (
    <div
      className={`absolute left-[-75%] top-[5%] w-[32rem] bg-white rounded-lg shadow-lg transform transition-transform duration-500 ${
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      }`}
      style={{
        transition: "opacity 0.5s, transform 0.5s",
        zIndex: 1000,
      }}
    >
      <div className="p-4 text-black">
        <h2 className="text-xl font-bold mb-4">About the Project</h2>
        <p>This project is a visualization of data on a 3D globe...</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
          reiciendis maxime dolor illum neque voluptate cum non labore? Nemo
          quia repudiandae magni odio quos recusandae voluptatem minima minus
          iure, labore amet veritatis aliquid voluptate blanditiis neque
          accusantium dolorem natus sequi perspiciatis molestias ab quibusdam?
          Cumque magni voluptates magnam debitis natus nisi cum ducimus
          excepturi dolores vitae corporis, ratione eligendi, dolorem,
          blanditiis quaerat dolor adipisci iure. Necessitatibus, deleniti
          nesciunt. Quae, laudantium veritatis esse optio sapiente nulla
          obcaecati consectetur, vitae at molestias quam voluptate modi nam ut?
          Nisi expedita necessitatibus vitae non, debitis quibusdam optio
          voluptate, dolorum minus porro numquam harum fugiat corporis quaerat
          at quae excepturi beatae pariatur voluptatem, adipisci fugit nulla
          mollitia assumenda. Voluptas veniam laboriosam suscipit dignissimos
          labore aperiam. Nobis, vitae eos eum necessitatibus vero aspernatur
          perspiciatis quibusdam nostrum, assumenda nisi qui numquam. Blanditiis
          similique nihil reprehenderit adipisci iste quo quaerat a quas
          deserunt? Placeat assumenda illo et delectus, inventore vel fugiat
          reprehenderit corporis expedita aliquid optio, voluptatem officiis
          reiciendis debitis consectetur molestias voluptate provident
          exercitationem molestiae aliquam voluptates! Ipsam incidunt nam
          consequuntur, consequatur vero animi unde perspiciatis illum
          voluptate!
        </p>
      </div>
    </div>
  );
};

export default AboutPanel;
