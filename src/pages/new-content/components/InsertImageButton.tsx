import { Transforms } from 'slate';
import { useEditor } from 'slate-react';

import { Button, Icon } from '.';

export function InsertImageButton() {
  const editor = useEditor();

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = window.prompt('Enter the URL of the image:');  // change
    if (!url) return;
    Transforms.insertNodes(editor, {
      type: "image",
      url,
      children: [{text: ""}]
    });
  };

  return (
    <Button onMouseDown={handleMouseDown}>
      <Icon className="link-icon">image</Icon>
    </Button>
  );
}