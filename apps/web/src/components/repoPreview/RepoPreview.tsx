interface RepoPreviewProps {
  url: string;
}

function RepoPreview({ url }: RepoPreviewProps) {
  return (
    <p className="preview">
      Repository URL: <b>{url.trim() === "" ? "Start typing..." : url}</b>
    </p>
  );
}

export default RepoPreview;
