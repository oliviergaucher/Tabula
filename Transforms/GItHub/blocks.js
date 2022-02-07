// @id YMDgyqaZ75Zhj4GZAUc3kE
// settings = {
//   client_id: "ee97e0e31dc02ad8757e",
//   client_secret: "5d828c069371491ed37e2fdb8267a3a3e9724459"
// }
// function sv(k, v) {
//   __tools.fermat.getCurrentContext().choreographer.backends.userStore.set(k, v);
// }

// sv('github:client_id', settings.client_id);
// sv('github:client_secret', settings.client_secret);
// sv('corsproxy', 'https://old-art-8d0a.y84.workers.dev/corsproxy/?apiurl=');

// @id r6u40WkmVdF5Lf7l3Y2qcF
class GithubConnector extends System.SourceControl {
  constructor() {
    super();

    this.apiUrl = 'https://api.github.com/';
    this.proxyUrl = null;
    this.defaultHeaders = null;
  }

  async getFiles(owner, repo, branch) {
    const branchRes = await this._call(`repos/${owner}/${repo}/branches/${branch}`)

    const sha = branchRes.commit.commit.tree.sha
    const res = await this._call(`repos/${owner}/${repo}/git/trees/${sha}?recursive=1`)
    return res.tree.filter(t => t.type === 'blob').map(t => t.path)
  }

  async createBranch(owner, repo, branch) {
    const mainBranch = await this._call(`repos/${owner}/${repo}/git/refs/heads/main`);

    return this._fetch('POST', `repos/${owner}/${repo}/git/refs`, {}, {
      ref: `refs/heads/${branch}`,
      sha: mainBranch.object.sha,
    });
  }

  async deleteBranch(name) {
    return this._call(`repos/${owner}/${repo}/git/refs/heads/${name}`, 'DELETE');
  }

  async listBranches(owner, repo) {
    return this._call(`repos/${owner}/${repo}/branches`);
  }

  async pull(owner, repo, branch) {
    const headers = await this._getDefaultHeaders();
    return CURL(this._makeProxyUrl(`${this.apiUrl}repos/${owner}/${repo}/zipball/${branch}`) + '&forward=headers', { headers, raw: true });
  }

  async push(owner, repo, branchName, headline, files) {
    const remoteFiles = await this.getFiles(owner, repo, branchName);
    const localFiles = new Set(Object.keys(files).map(file => file.split('/').splice(1).join('/')));
    const deletions = remoteFiles.filter((path) => !localFiles.has(path)).map((path) => ({ path }));

    const additions = [];
    for (const [key, contents] of Object.entries(files)) {
      additions.push({ path: key.split('/').splice(1).join('/'), contents });
    }

    const lastCommit = await this._call(`repos/${owner}/${repo}/commits/${branchName}`);
    return this._fetch('POST', 'graphql', {}, {
      query:
        `mutation ($input: CreateCommitOnBranchInput!) {
        createCommitOnBranch(input: $input) {
          commit {
            committedDate
          }
        }
      }`,
      variables: {
        input: {
          branch: { repositoryNameWithOwner: `${owner}/${repo}`, branchName },
          message: { headline: headline },
          fileChanges: { additions, deletions },
          expectedHeadOid: lastCommit.sha,
        },
      },
    });
  }

  async _call(urlPath, method = 'GET') {
    return this._fetch(method, urlPath, { Accept: 'application/vnd.github.v3+json' });
  }

  async _fetch(method, urlPath, headers = {}, data = null) {
    Object.assign(headers, await this._getDefaultHeaders());
    const body = data ? JSON.stringify(data) : data;
    const res = await CURL(this.apiUrl + urlPath, { method, headers, body });
    return JSON.parse(res);
  }

  async _getDefaultHeaders() {
    if (this.defaultHeaders) {
      return this.defaultHeaders;
    }

    this.proxyUrl = await GETUSERVAR('corsproxy');

    const clientId = await GETUSERVAR('github:client_id');
    const clientSecret = await GETUSERVAR('github:client_secret');
    const githubOAuthUrl = 'https://github.com/login/oauth';

    const connector = this;
    const token = await GETTOKEN({
      url: `${githubOAuthUrl}/authorize?client_id=${clientId}&scope=user repo`,
      async getTokenFromResponse(res) {
        const match = res.match(/(?:code)=([^&]*)/);
        const code = match && match[1];
        if (!code) {
          throw new Error(`Cannot extract grant code from '${res}'`);
        }

        const urlAuth = `${githubOAuthUrl}/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`
        const response = await CURL(connector._makeProxyUrl(urlAuth), { method: 'POST', headers: { Accept: "application/json" } });
        return JSON.parse(response).access_token;
      }
    });

    this.defaultHeaders = { Authorization: `token ${token}` };
    return this.defaultHeaders;
  }

  _makeProxyUrl(url) {
    return this.proxyUrl + encodeURIComponent(url);
  }
}