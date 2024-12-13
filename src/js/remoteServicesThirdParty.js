import { projectIdentifierBySelector } from "./utils"

export default {
  "gitlab-camao": {
    name: "gitlab",
    host: "https://gitlab.camao.one",
    urlPatterns: [
      ":host:/:org/:group(/*)/:projectId/-/issues/:id(#note_:noteId)",
      ":host:/:org(/*)/:projectId/-/issues/:id(#note_:noteId)",
      ":host:/:org/:group(/*)/:projectId/-/merge_requests/:id(#note_:noteId)",
      ":host:/:org(/*)/:projectId/-/merge_requests/:id(#note_:noteId)",
    ],
    description: (document, service, { id, noteId: _noteId }) => {
      const title = document.querySelector(".detail-page-description .title")?.textContent?.trim()
      return `#${id} ${title || ""}`.trim()
    },
    allowHostOverride: true,
  },
  "gitlab-marketplace": {
    name: "gitlab",
    host: "https://git.tsi-dev.otc-service.com",
    urlPatterns: [
      ":host:/:org/:group(/*)/:projectId/-/issues/:id(#note_:noteId)",
      ":host:/:org(/*)/:projectId/-/issues/:id(#note_:noteId)",
      ":host:/:org/:group(/*)/:projectId/-/merge_requests/:id(#note_:noteId)",
      ":host:/:org(/*)/:projectId/-/merge_requests/:id(#note_:noteId)",
    ],
    description: (document, service, { id, noteId: _noteId }) => {
      const title = document.querySelector(".detail-page-description .title")?.textContent?.trim()
      return `#${id} ${title || ""}`.trim()
    },
    allowHostOverride: true,
  },
  "jira-otc": {
    name: "jira",
    host: "https://jira.tsi-dev.otc-service.com",
    urlPatterns: [
      ":host:/secure/RapidBoard.jspa",
      ":host:/browse/:id(#comment-:commentId)",
      ":host:/jira/software/projects/:projectId/boards/:board",
      ":host:/jira/software/projects/:projectId/boards/:board/backlog",
      ":host:/jira/software/projects/:projectId/boards/:board/roadmap",
      ":host:/jira/software/projects/:projectId/boards/:board/timeline",
      ":host:/jira/software/c/projects/:projectId/boards/:board",
      ":host:/jira/software/c/projects/:projectId/boards/:board/backlog",
      ":host:/jira/software/c/projects/:projectId/boards/:board/roadmap",
      ":host:/jira/software/c/projects/:projectId/boards/:board/timeline",
      ":host:/jira/core/projects/:projectId/board",
      ":host:/jira/core/projects/:projectId/issues",
      ":host:/jira/core/projects/:projectId/list",
      ":host:/jira/core/projects/:projectId/timeline",
    ],
    queryParams: {
      id: "selectedIssue",
      projectId: "projectKey",
    },
    description: (document, service, { id }) => {
      const title =
        document
          .querySelector('[data-testid="issue.views.issue-base.foundation.summary.heading"]')
          ?.textContent?.trim() ||
        document.querySelector(".ghx-selected .ghx-summary")?.textContent?.trim() ||
        document.querySelector('[id="summary-val"]')?.innerText?.trim()
      return `#${id} ${title || ""}`
    },
    projectId: (document, service, { projectId }) => {
      // The title of the issue
      const projectIdFromIssue = projectIdentifierBySelector(
        "[data-testid='issue.views.issue-base.foundation.summary.heading']",
      )(document)

      if (projectIdFromIssue) {
        return projectIdFromIssue
      }

      // The second breadcrumb item
      const match = document
        .querySelector('nav[aria-label="Breadcrumbs"] ol li:nth-child(2)')
        ?.textContent?.match(projectRegex)

      if (match && match[1]) {
        return match[1]
      }

      return projectId
    },
    allowHostOverride: true,
  },
}
