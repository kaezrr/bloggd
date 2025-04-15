import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { Editbar } from "./components/Editbar";

function PostForm() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editbar title={id ? "Edit Blog" : "Write A New Blog"} />
      {loading && <h1>Your editor is loading</h1>}
      <Editor
        apiKey="nog7w03gks6drksjvgx61ut6rxmefjm5hzlil49tipquwjvu"
        onInit={(evt, editor) => {
          editorRef.current = editor;
          setLoading(false);
        }}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}

export default PostForm;
