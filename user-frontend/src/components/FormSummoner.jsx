import { useRef } from "react";

export function FormSummoner({ postId, onSubmitSuccess }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const dialogRef = useRef(null);

  const showDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = (e) => {
    e.preventDefault();
    dialogRef.current?.close();
  };

  const submitAndRefresh = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await fetch(`${apiUrl}/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData.entries())),
      headers: { "Content-Type": "application/json" },
    });
    dialogRef.current?.close();
    onSubmitSuccess();
  };

  return (
    <div>
      <button onClick={showDialog}>Leave A Comment</button>
      <dialog ref={dialogRef}>
        <form onSubmit={submitAndRefresh}>
          <input type="text" name="author" placeholder="Name" required />
          <input type="text" name="comment" placeholder="Comment" required />
          <div>
            <button type="submit">Submit</button>
            <button onClick={closeDialog}>Close</button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
