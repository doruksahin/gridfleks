export default function BgAnimation() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2">
      <video className="videoTag bg-slate-100" autoPlay loop muted>
        <source src={require('../public/new-bg.mp4')} type="video/mp4" />
      </video>
    </div>
  );
}
