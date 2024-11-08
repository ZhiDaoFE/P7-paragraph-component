document.addEventListener('DOMContentLoaded', () => {
  const suffix = ' -- 之道前端';

  const p1 = new Paragraph({
    id: 'paragraph1',
    row: 3,
    text: '学前端，来之道 —— 陪伴式自学前端圈子！'.repeat(20)
  });

  const p2 = new Paragraph({
    id: 'paragraph2',
    cls: 'test',
    expandable: true,
    text: '学前端，来之道 —— 陪伴式自学前端圈子！'.repeat(20)
  });

  const addBtn = new Button({
    id: 'add',
    onClick: () => {
      p2.setRow(p2.getRow() + 1);
    }
  });

  const minusBtn = new Button({
    id: 'minus',
    onClick: () => {
      p2.setRow(p2.getRow() - 1);
    }
  });

  const addSuffixBtn = new Button({
    id: 'addSuffix',
    onClick: () => {
      p2.setSuffix(suffix);
    }
  });

  const removeSuffixBtn = new Button({
    id: 'removeSuffix',
    onClick: () => {
      p2.setSuffix('');
    }
  });
});