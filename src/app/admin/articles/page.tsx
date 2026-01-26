"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Search, Edit, Trash2, Eye, EyeOff, 
  X, Save, Tag, Image as ImageIcon, Upload
} from "lucide-react";
import { Article, supabase } from "@/lib/supabase";

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
      title: "",
      content: "",
      image: "",
      category: "conseil" as Article["category"],
      published: true,
      price: 0,
    });

  const fetchArticles = async () => {
    const res = await fetch("/api/articles");
    const data = await res.json();
    setArticles(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `articles/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image: publicUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Erreur lors du téléversement de l\'image');
    } finally {
      setIsUploading(false);
    }
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (article?: Article) => {
    if (article) {
      setEditingArticle(article);
      setFormData({
        title: article.title,
        content: article.content,
        image: article.image || "",
        category: article.category,
        published: article.published,
        price: article.price || 0,
      });
    } else {
      setEditingArticle(null);
      setFormData({
        title: "",
        content: "",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
        category: "conseil",
        published: true,
        price: 0,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (editingArticle) {
      await fetch(`/api/articles/${editingArticle.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
      await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }
    fetchArticles();
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      await fetch(`/api/articles/${id}`, { method: "DELETE" });
      fetchArticles();
    }
  };

  const togglePublish = async (article: Article) => {
    await fetch(`/api/articles/${article.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !article.published }),
    });
    fetchArticles();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#0066ff]/30 border-t-[#0066ff] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-orbitron text-3xl font-bold text-[#0a1628] mb-2">
              Gestion des Articles
            </h1>
            <p className="text-gray-600 font-rajdhani">
              {articles.length} articles au total
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="btn-tech flex items-center gap-2 w-fit"
          >
            <Plus className="w-5 h-5" />
            Nouvel article
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#0066ff] focus:ring-2 focus:ring-[#0066ff]/20 outline-none transition-all font-rajdhani"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-tech overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Article</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Catégorie</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Prix</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Statut</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredArticles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={article.image || ""}
                        alt={article.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-[#0a1628] line-clamp-1">{article.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-1">{article.content}</p>
                      </div>
                    </div>
                  </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        article.category === "conseil" ? "bg-[#0066ff]/10 text-[#0066ff]" :
                        article.category === "actualite" ? "bg-[#00d4ff]/10 text-[#00d4ff]" :
                        "bg-purple-100 text-purple-600"
                      }`}>
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-[#0066ff]">
                      {article.price} FCFA
                    </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(article.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => togglePublish(article)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        article.published
                          ? "bg-green-100 text-green-600 hover:bg-green-200"
                          : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                      }`}
                    >
                      {article.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {article.published ? "Publié" : "Brouillon"}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openModal(article)}
                        className="p-2 rounded-lg text-gray-500 hover:bg-[#0066ff]/10 hover:text-[#0066ff] transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-2 rounded-lg text-gray-500 hover:bg-red-100 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun article trouvé</p>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="font-orbitron text-xl font-semibold text-[#0a1628]">
                  {editingArticle ? "Modifier l'article" : "Nouvel article"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0066ff] focus:ring-2 focus:ring-[#0066ff]/20 outline-none transition-all font-rajdhani"
                      placeholder="Titre de l'article"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contenu
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0066ff] focus:ring-2 focus:ring-[#0066ff]/20 outline-none transition-all font-rajdhani resize-none"
                      placeholder="Contenu de l'article..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <ImageIcon className="w-4 h-4 inline mr-2" />
                      Image de couverture
                    </label>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0066ff] focus:ring-2 focus:ring-[#0066ff]/20 outline-none transition-all font-rajdhani pr-12"
                            placeholder="URL de l'image ou téléversez-en une..."
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <ImageIcon className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                        <label className={`cursor-pointer flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed transition-all ${
                          isUploading 
                            ? "bg-gray-50 border-gray-300 text-gray-400" 
                            : "bg-[#0066ff]/5 border-[#0066ff]/20 text-[#0066ff] hover:bg-[#0066ff]/10"
                        }`}>
                          <Upload className={`w-5 h-5 ${isUploading ? "animate-bounce" : ""}`} />
                          <span className="font-medium whitespace-nowrap">
                            {isUploading ? "Téléversement..." : "Téléverser"}
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={isUploading}
                          />
                        </label>
                      </div>
                      {formData.image && (
                        <div className="relative rounded-xl overflow-hidden border border-gray-100 group max-w-sm">
                          <img src={formData.image} alt="Preview" className="w-full h-32 object-cover" />
                          <button
                            onClick={() => setFormData({ ...formData, image: "" })}
                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix (FCFA)
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0066ff] focus:ring-2 focus:ring-[#0066ff]/20 outline-none transition-all font-rajdhani"
                      placeholder="Prix de l'article"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Tag className="w-4 h-4 inline mr-2" />
                      Catégorie
                    </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Article["category"] })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0066ff] focus:ring-2 focus:ring-[#0066ff]/20 outline-none transition-all font-rajdhani"
                  >
                    <option value="conseil">Conseil</option>
                    <option value="actualite">Actualité</option>
                    <option value="astuce">Astuce</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-[#0066ff] focus:ring-[#0066ff]"
                  />
                  <label htmlFor="published" className="text-sm text-gray-700">
                    Publier immédiatement
                  </label>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  className="btn-tech flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {editingArticle ? "Mettre à jour" : "Créer"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
