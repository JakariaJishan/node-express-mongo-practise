import { Link } from "react-router-dom";

const BookList = (props) => {
  const { _id,title, author, updated_date } = props.book;
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="-m-4 ">
          <div className=" p-4 ">
            <div className="bg-gray-100 p-6 rounded-lg">
              <img
                className="h-80 rounded w-full object-cover object-center mb-6"
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
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
