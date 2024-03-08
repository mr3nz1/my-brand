export function formatDate(date) {
    const options = {
        month: "short",
        day: "numeric",
        year: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
}
// const url = "https://portfolio-backend-0yqb.onrender.com/api/v1";
// const url = "http://13.60.34.0:3000/api/v1";
const url = "https://my-brand-paterne-backend.vercel.app/api/v1";