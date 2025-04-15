import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { Editbar } from "./components/Editbar";

function PostForm() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [pub, setPub] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (id) {
        const response = await fetch(`${apiUrl}/posts/all/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPost(data.data);
          setPub(!!data.data.published);
        }
      }
    }
    fetchData();
  }, [id]);

  const editorRef = useRef(null);
  const titleRef = useRef(null);
  const publishRef = useRef(null);
  const navigate = useNavigate();

  const submitPost = async () => {
    const title = titleRef.current?.value;
    const text = editorRef.current?.getContent();
    const published = publishRef.current?.checked;

    const url = id ? `${apiUrl}/posts/${id}` : `${apiUrl}/posts`;

    const response = await fetch(url, {
      method: post ? "PUT" : "POST",
      body: JSON.stringify({ title, text, published }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      navigate("/");
    } else {
      console.log(await response.json());
    }
  };

  return (
    <>
      <Editbar title={id ? "Edit Blog" : "Write A New Blog"} />
      <input
        ref={titleRef}
        type="text"
        name="title"
        placeholder="Blog Title"
        defaultValue={post?.title}
        required
      />
      <div className="publish">
        <label>Publish On Submit</label>
        <input
          ref={publishRef}
          type="checkbox"
          name="published"
          checked={pub}
          onChange={(e) => setPub(e.target.checked)}
        />
      </div>
      {loading && <h1>Your editor is loading</h1>}
      <Editor
        apiKey="nog7w03gks6drksjvgx61ut6rxmefjm5hzlil49tipquwjvu"
        onInit={(evt, editor) => {
          editorRef.current = editor;
          setLoading(false);
        }}
        initialValue={post?.text}
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
      <button onClick={submitPost} disabled={loading}>
        {post ? "Edit" : "Create"} Blog
      </button>
    </>
  );
}

export default PostForm;
