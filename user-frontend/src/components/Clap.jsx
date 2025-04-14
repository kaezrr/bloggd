export function Clap({ likes, setLikes }) {
  return (
    <button onClick={setLikes}>
      <img src="/clap.svg" alt="claps" />
      {likes}
    </button>
  );
}
