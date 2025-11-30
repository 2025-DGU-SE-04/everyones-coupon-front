import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function AdminLoginPage() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token.trim()) {
      setError("토큰을 입력해주세요.");
      return;
    }

    setLoading(true);
    const result = await login(token);
    setLoading(false);

    if (result.success) {
      navigate("/admin/dashboard");
    } else {
      setError(result.error || "로그인에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-secondary-900 mb-2">관리자 로그인</h1>
          <p className="text-sm text-secondary-500">관리자 토큰을 입력해주세요</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="관리자 토큰"
              type="text"
              placeholder="관리자 토큰을 입력하세요"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              disabled={loading}
              required
            />

            {error && (
              <div className="bg-danger-50 border-2 border-danger-200 text-danger-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading}
            >
              {loading ? "로그인 중..." : "로그인"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
