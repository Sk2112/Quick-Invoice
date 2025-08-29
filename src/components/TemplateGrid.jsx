import { templates } from "../assets/assets";

const TemplateGrid = ({ onTemplateClick }) => {
  return (
    <div className="container py-4 border border-2 h-100">
      <div className="row g-3">
        {templates.map((item, index) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
            <div
              className="card h-100 shadow-sm template-hover cursor-pointer border-0"
              title={item.label}
              onClick={() => onTemplateClick(index + 1)}
              style={{ transition: "transform 0.3s", cursor: "pointer" }}
            >
              <div className="overflow-hidden" style={{ height: "240px" }}>
                <img
                  src={item.image}
                  alt={item.label}
                  className="card-img-top h-100 object-fit-cover"
                  loading="lazy"
                />
              </div>
              <div className="card-body text-center py-2">
                <h6 className="fw-semibold mb-0">{item.label}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateGrid;
