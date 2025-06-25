import React from 'react';
import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { EditorState, useEditorState } from '../editor/EditorContext';
import OrderedListIcon from './icons/OrderedListIcon';
import UnorderedListIcon from './icons/UnorderedListIcon';

export const BtnBold = createButton('Bold', '𝐁', 'bold');

export const BtnBulletList = createButton(
  'Bullet list',
  <UnorderedListIcon />,
  'insertUnorderedList',
);

export const BtnClearFormatting = createButton(
  'Clear formatting',
  'T̲ₓ',
  'removeFormat',
);

export const BtnItalic = createButton('Italic', '𝑰', 'italic');

export const BtnStrikeThrough = createButton(
  'Strike through',
  <s>ab</s>,
  'strikeThrough',
);

export const BtnLink = createButton('Link', '🔗', ({ $selection }) => {
  if ($selection?.nodeName === 'A') {
    document.execCommand('unlink');
  } else {
    // eslint-disable-next-line no-alert
    document.execCommand('createLink', false, prompt('URL', '') || undefined);
  }
});

export const BtnNumberedList = createButton(
  'Numbered list',
  <OrderedListIcon />,
  'insertOrderedList',
);

export const BtnRedo = createButton('Redo', '↷', 'redo');

export const BtnUnderline = createButton(
  'Underline',
  <span style={{ textDecoration: 'underline' }}>𝐔</span>,
  'underline',
);

export const BtnUndo = createButton('Undo', '↶', 'undo');

export function createButton(
  title: string,
  content: ReactNode,
  command: ((state: EditorState) => void) | string,
) {
  ButtonFactory.displayName = title.replace(/\s/g, '');

  return ButtonFactory;

  function ButtonFactory(props: HTMLAttributes<HTMLButtonElement>) {
    const editorState = useEditorState();
    const { $el, $selection } = editorState;

    let active = false;
    if (typeof command === 'string') {
      active = !!$selection && document.queryCommandState(command);
    }

    function onAction(e: MouseEvent<HTMLButtonElement>) {
      e.preventDefault();

      if (document.activeElement !== $el) {
        $el?.focus();
      }

      if (typeof command === 'function') {
        command(editorState);
      } else {
        document.execCommand(command);
      }
    }

    if (editorState.htmlMode) {
      return null;
    }

    return (
      <button
        className="rsw-btn"
        data-active={active}
        onMouseDown={onAction}
        tabIndex={-1}
        title={title}
        type="button"
        {...props}
      >
        {content}
      </button>
    );
  }
}
