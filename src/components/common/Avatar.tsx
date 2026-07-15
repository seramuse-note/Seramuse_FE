function Avatar({ className }: { className?: string }) {
  return (
    <div className={`relative w-12 h-12 ${className}`}>
      <div className="rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
        <img
          src="https://i.pinimg.com/736x/6d/21/77/6d2177dd84fe192cc81c87ba38551f08.jpg"
          alt=""
          className="w-full h-full rounded-full"
        />
      </div>
      <img
        width="20"
        height="20"
        src="https://img.icons8.com/3d-stickle/100/cherry-969.png"
        alt="cherry-969"
        className="absolute bottom-0 right-0"
      />
    </div>
  );
}

export default Avatar;
