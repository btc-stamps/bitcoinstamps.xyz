import { useSSRContext, unref } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const data = JSON.parse('[{"frontmatter":{"title":"Bitcoin Stamps Protocol Whitepaper Released","date":"2026-02-25","author":"reinamora","description":"The official Bitcoin Stamps Protocol technical whitepaper is now available, documenting the complete specification for permanent digital assets on Bitcoin through UTXO storage.","tags":["whitepaper","protocol","src-20","bitcoin-stamps","announcement"],"leoType":"blog"},"url":"/en/blog/2026-02-whitepaper-released.html"}]');
const __pageData = JSON.parse('{"title":"Blog","description":"Updates, announcements, and technical deep-dives from the Bitcoin Stamps community","frontmatter":{"title":"Blog","description":"Updates, announcements, and technical deep-dives from the Bitcoin Stamps community","leoType":"blog","layout":"page"},"headers":[],"relativePath":"en/blog/index.md","filePath":"en/blog/index.md","lastUpdated":1783120931000}');
const __default__ = { name: "en/blog/index.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-985c2290><h1 id="blog" tabindex="-1" data-v-985c2290>Blog <a class="header-anchor" href="#blog" aria-label="Permalink to &quot;Blog&quot;" data-v-985c2290>​</a></h1><p data-v-985c2290>Updates, announcements, and technical deep-dives from the Bitcoin Stamps community — the protocol builders, artists, and contributors shaping permanent digital assets on Bitcoin.</p><div class="blog-listing" data-v-985c2290><!--[-->`);
      ssrRenderList(unref(data), (post) => {
        _push(`<article class="blog-post-item" data-v-985c2290><div class="blog-post-meta" data-v-985c2290><time${ssrRenderAttr("datetime", post.frontmatter.date)} data-v-985c2290>${ssrInterpolate(new Date(post.frontmatter.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }))}</time>`);
        if (post.frontmatter.author) {
          _push(`<span class="blog-post-author" data-v-985c2290> — ${ssrInterpolate(post.frontmatter.author)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><h2 class="blog-post-title" data-v-985c2290><a${ssrRenderAttr("href", post.url)} data-v-985c2290>${ssrInterpolate(post.frontmatter.title)}</a></h2>`);
        if (post.frontmatter.description) {
          _push(`<p class="blog-post-excerpt" data-v-985c2290>${ssrInterpolate(post.frontmatter.description)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (post.frontmatter.tags) {
          _push(`<div class="blog-post-tags" data-v-985c2290><!--[-->`);
          ssrRenderList(post.frontmatter.tags, (tag) => {
            _push(`<span class="blog-tag" data-v-985c2290>${ssrInterpolate(tag)}</span>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<a${ssrRenderAttr("href", post.url)} class="blog-read-more" data-v-985c2290>Read more →</a></article>`);
      });
      _push(`<!--]-->`);
      if (!unref(data) || unref(data).length === 0) {
        _push(`<div class="blog-empty" data-v-985c2290> No posts yet. Check back soon. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/blog/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-985c2290"]]);
export {
  __pageData,
  index as default
};
