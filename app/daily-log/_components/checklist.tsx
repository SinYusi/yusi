import { css } from "@/styled-system/css";
import type { DailyTask } from "@/lib/daily-log/types";
import { addTask, toggleTask, deleteTask } from "@/app/daily-log/actions";

const list = css({ display: "flex", flexDirection: "column", gap: "2" });

const row = css({
  display: "flex",
  alignItems: "center",
  gap: "3",
  paddingX: "3",
  paddingY: "2.5",
  borderWidth: "1px",
  borderColor: "border.subtle",
  borderRadius: "l2",
});

const checkBase = css({
  flexShrink: "0",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "5",
  height: "5",
  borderRadius: "l1",
  cursor: "pointer",
  background: "none",
  padding: "0",
});

const checkDone = css({
  backgroundColor: "accent.default",
  color: "accent.fg",
  borderWidth: "0",
});

const checkTodo = css({
  borderWidth: "1.5px",
  borderColor: "border.subtle",
  color: "transparent",
});

const titleBase = css({ flex: "1", fontSize: "sm", color: "text.default" });
const titleDone = css({ color: "text.muted", textDecoration: "line-through" });

const srOnly = css({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: "0",
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: "0",
});

const deleteBtn = css({
  flexShrink: "0",
  display: "inline-flex",
  color: "text.muted",
  cursor: "pointer",
  background: "none",
  borderWidth: "0",
  padding: "1",
  borderRadius: "l1",
  _hover: { color: "text.default", backgroundColor: "bg.subtle" },
});

const addForm = css({
  display: "flex",
  gap: "2",
  marginTop: "3",
});

const addInput = css({
  flex: "1",
  height: "10",
  paddingX: "3",
  fontSize: "sm",
  color: "text.default",
  backgroundColor: "bg.canvas",
  borderWidth: "1px",
  borderColor: "border.subtle",
  borderRadius: "l2",
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "accent.default",
    outlineOffset: "1px",
  },
});

const addButton = css({
  flexShrink: "0",
  paddingX: "4",
  height: "10",
  fontSize: "sm",
  fontWeight: "medium",
  color: "accent.fg",
  backgroundColor: "accent.default",
  borderRadius: "l2",
  cursor: "pointer",
  transition: "background-color 0.15s",
  _hover: { backgroundColor: "accent.emphasized" },
});

const empty = css({
  fontSize: "sm",
  color: "text.muted",
  paddingY: "6",
  textAlign: "center",
});

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
    </svg>
  );
}

export function Checklist({
  tasks,
  owner,
}: {
  tasks: DailyTask[];
  owner: boolean;
}) {
  if (tasks.length === 0 && !owner) {
    return <p className={empty}>아직 오늘의 기록이 없어요.</p>;
  }

  return (
    <div>
      <ul className={list}>
        {tasks.map((task) => (
          <li key={task.id} className={row}>
            {owner ? (
              <form action={toggleTask}>
                <input type="hidden" name="id" value={task.id} />
                <input type="hidden" name="done" value={String(task.done)} />
                <button
                  type="submit"
                  className={`${checkBase} ${task.done ? checkDone : checkTodo}`}
                  aria-label={task.done ? "완료 취소" : "완료로 표시"}
                  aria-pressed={task.done}
                >
                  {task.done ? <CheckIcon /> : null}
                </button>
              </form>
            ) : (
              <span
                className={`${checkBase} ${task.done ? checkDone : checkTodo}`}
                aria-hidden="true"
              >
                {task.done ? <CheckIcon /> : null}
              </span>
            )}

            <span className={`${titleBase} ${task.done ? titleDone : ""}`}>
              {task.title}
              <span className={srOnly}>{task.done ? " 완료됨" : " 미완료"}</span>
            </span>

            {owner ? (
              <form action={deleteTask}>
                <input type="hidden" name="id" value={task.id} />
                <button
                  type="submit"
                  className={deleteBtn}
                  aria-label="항목 삭제"
                >
                  <TrashIcon />
                </button>
              </form>
            ) : null}
          </li>
        ))}
      </ul>

      {owner ? (
        <form className={addForm} action={addTask}>
          <input
            className={addInput}
            type="text"
            name="title"
            placeholder="할 일 추가하기…"
            aria-label="할 일 입력"
            maxLength={200}
            required
          />
          <button type="submit" className={addButton}>
            추가
          </button>
        </form>
      ) : null}
    </div>
  );
}
