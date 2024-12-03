import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Cast, Movie } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MovieCardProps {
  movie: Movie;
}

const truncateText = (text: string, maxLength = 100) =>
  text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

const renderCast = (casts: Cast[]) => {
  return casts.map((cast, index) => (
    <div key={index} className="flex items-center gap-4">
      <Avatar>
        {cast.profile_path ? (
          <AvatarImage src={cast.profile_path} alt={cast.name} />
        ) : (
          <AvatarFallback>{cast.name[0]}</AvatarFallback>
        )}
      </Avatar>
      <div>
        <p className="font-semibold">{cast.name}</p>
        {cast.character && (
          <p className="text-sm text-muted-foreground">{cast.character}</p>
        )}
      </div>
    </div>
  ));
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const renderPoster = (posterPath: string | null) => {
    return posterPath ? (
      <img
        src={posterPath}
        alt={movie.title}
        className="w-full h-64 object-cover rounded-lg"
      />
    ) : (
      <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
        No Poster
      </div>
    );
  };

  return (
    <section className="w-full mt-6">
      <Card className="h-full flex flex-col shadow-md">
        <CardHeader>{renderPoster(movie.poster_path)}</CardHeader>
        <CardContent>
          <CardTitle className="text-xl font-bold">{movie.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            Release Year: {movie.release_date.split("-")[0]}
          </p>
          <p className="text-sm mt-2">{truncateText(movie.description)}</p>
        </CardContent>
        <CardFooter className="mt-auto flex flex-col gap-2 ">
          {movie.trailer && (
            <Button variant="link" asChild className="w-full">
              <a href={movie.trailer} target="_blank" rel="noopener noreferrer">
                Watch Trailer{" "}
              </a>
            </Button>
          )}
          {movie.casts.length > 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  View Cast
                </Button>
              </DialogTrigger>
              <DialogContent className="h-[90vh]">
                <ScrollArea className="h-full">
                  <DialogHeader>
                    <DialogTitle>{movie.title} - Cast</DialogTitle>

                    <DialogDescription className="grid gap-4 grid-cols-2 sm:grid-cols-3">
                      {renderCast(movie.casts)}
                    </DialogDescription>
                  </DialogHeader>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          )}
        </CardFooter>
      </Card>
    </section>
  );
};

export default MovieCard;
