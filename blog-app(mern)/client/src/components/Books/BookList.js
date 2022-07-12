import { Link } from "react-router-dom";

const BookList = (props) => {
  const { _id, title, author, updated_date, book_pic } = props.book;
  const arrayBuffer = book_pic?.data?.data;
  const base64String = btoa(new Uint8Array(arrayBuffer).reduce(function (data, byte) {
    return data + String.fromCharCode(byte);
}, ''));

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="-m-4 ">
          <div className=" p-4 ">
            <div className="bg-gray-100 p-6 rounded-lg">
              <img
                className="h-80 rounded w-full object-cover object-center mb-6"
                src={`data:image/png;base64,${base64String}`}
                alt="content"
              />
              <Link to={`show-book/${_id}`}>
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                  {updated_date}
                </h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  {title}
                </h2>

                <p className="leading-relaxed text-base">{author}</p>
                <p className="leading-relaxed text-base">
                  Fingerstache flexitarian street art 8-bit waistcoat.
                  Distillery hexagon disrupt edison bulbche.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookList;
